// The same Complyant gate as .github/workflows/complyant.yml, for Jenkins.
// One stage: ask the API to scan this commit and fail the build on new
// accessibility defects. Known defects are reported, never blocking.
//
// Credentials: COMPLYANT_API_URL (secret text), COMPLYANT_TOKEN (secret text).
// Not run in this build; committed so the two pipelines call one API.

pipeline {
  agent any

  environment {
    COMPLYANT_API_URL = credentials('COMPLYANT_API_URL')
    COMPLYANT_TOKEN   = credentials('COMPLYANT_TOKEN')
    REPO_FULL_NAME    = 'gantra-ai/complyant-demo-site'
  }

  stages {
    stage('Complyant accessibility gate') {
      steps {
        sh '''
          set -euo pipefail
          ref="${CHANGE_BRANCH:-${BRANCH_NAME:-main}}"
          sha="$(git rev-parse HEAD)"
          body=$(jq -n --arg r "$REPO_FULL_NAME" --arg ref "$ref" --arg sha "$sha" \
            '{repo_full_name: $r, ref: $ref, sha: $sha}')
          response=$(curl --silent --show-error --fail-with-body --max-time 600 \
            -H "Authorization: Bearer $COMPLYANT_TOKEN" \
            -H "Content-Type: application/json" \
            -d "$body" "$COMPLYANT_API_URL/v1/ci/gate")
          echo "$response" | jq .
          [ "$(echo "$response" | jq -r .status)" = "pass" ] || {
            echo "$response" | jq -r '.new_defects[] | "NEW: \\(.severity) \\(.source_file):\\(.source_line) \\(.message)"'
            exit 1
          }
        '''
      }
    }
  }
}
