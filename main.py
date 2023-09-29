import os
from datetime import datetime

import dotenv

from utils.github import GitHub, GithubRepository
from utils.template import PlainTemplate

dotenv.load_dotenv()

github = GitHub(
    login=os.environ["GITHUB_LOGIN"],
    token=os.environ["GITHUB_TOKEN"],
)

repo = github.repository(github.login)

renderer = PlainTemplate(
    directory="templates",
    encoding="utf-8",
)


def update_ignore(
    repo: GithubRepository,
    path: str,
    content: str,
    message: str,
    committer_name: str,
    committer_email: str,
    branch: str | None = None,
) -> bool:
    """
    Updates a file in the repository if the content is different.

    Args:
        repo (GithubRepository): The repository to update.
        path (str): The path to the file.
        content (str): The new content.
        message (str): The commit message.
        committer_name (str): The committer name.
        committer_email (str): The committer email.
        branch (str | None): The branch to update. Defaults to the default branch.

    Returns:
        bool: Whether the file was updated.
    """
    current_content = repo.get_content(path=path, ref=branch)

    if current_content == content:
        print(f"File {path} is up to date")
        return False

    print(f"Updating file {path}")
    repo.update_content(
        path=path,
        content=content,
        message=message,
        committer_name=committer_name,
        committer_email=committer_email,
        branch=branch,
    )

    return True


##########################
##       readme.md      ##
##########################
data = github.graphql(
    """
query {
    viewer {
        repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
        }
        pullRequests(first: 1) {
            totalCount
        }
        issues(first: 1) {
            totalCount
        }
        repositories(first: 100, ownerAffiliations: [OWNER], orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
                pullRequests {
                    totalCount
                }
                issues {
                    totalCount
                }
                stargazers {
                    totalCount
                }
            }
        }
    }
}
"""
)["data"]["viewer"]

update_ignore(
    repo=repo,
    path="readme.md",
    content=renderer.render(
        "readme.md",
        **{
            "total_stars": sum(
                [repo["stargazers"]["totalCount"] for repo in data["repositories"]["nodes"]]
            ),
            "total_commits": github.total_commits(),
            "total_pull_requests": data["pullRequests"]["totalCount"],
            "total_issues": data["issues"]["totalCount"],
            "contributed_to": data["repositoriesContributedTo"]["totalCount"]
            + data["repositories"]["totalCount"],
        },
    ),
    message=f"Update readme.md ({datetime.now().strftime('%Y-%m-%d')})",
    committer_name=os.environ["COMMITTER_NAME"],
    committer_email=os.environ["COMMITTER_EMAIL"],
)
