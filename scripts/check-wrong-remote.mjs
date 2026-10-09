#!/usr/bin/env node
/**
 * WRONG_REMOTE guard — refuse to continue when `origin` is not the expected
 * LakeHouse-LLP GitHub remote for this working tree.
 */
import { expectedRemoteFromEnvOrGit, git, parseGithubRemote } from "./lib/repo.mjs";

const EXPECTED_ORG = "LakeHouse-LLP";

function main() {
  const origin = git(["remote", "get-url", "origin"], { ignoreError: true });
  if (!origin) {
    console.error("WRONG_REMOTE: no git remote named origin");
    process.exit(1);
  }

  const actual = parseGithubRemote(origin);
  if (!actual) {
    console.error(`WRONG_REMOTE: origin is not a GitHub remote: ${origin}`);
    process.exit(1);
  }

  const expected = expectedRemoteFromEnvOrGit();
  if (!expected) {
    console.error("WRONG_REMOTE: could not determine expected owner/name");
    process.exit(1);
  }

  if (actual.owner !== expected.owner || actual.name !== expected.name) {
    console.error(
      `WRONG_REMOTE: origin is ${actual.owner}/${actual.name}, expected ${expected.owner}/${expected.name}`,
    );
    process.exit(1);
  }

  if (actual.owner !== EXPECTED_ORG) {
    console.error(`WRONG_REMOTE: origin org is ${actual.owner}, expected ${EXPECTED_ORG}`);
    process.exit(1);
  }

  if (actual.name.startsWith("Template-") && process.env.ALLOW_TEMPLATE_REMOTE !== "1") {
    // Template repos themselves are allowed when GITHUB_REPOSITORY matches.
    // Derived projects must not keep a Template- remote name.
    const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? actual.name;
    if (repo !== actual.name) {
      console.error(
        `WRONG_REMOTE: refusing Template-* remote for non-template checkout (${actual.name})`,
      );
      process.exit(1);
    }
  }

  console.log(`OK remote: ${actual.owner}/${actual.name}`);
}

main();
