import base64
from typing import Any
from urllib.parse import urljoin

import requests


class GithubRepository:
    github: "GitHub"
    """The GitHub API client used to make requests to the GitHub API."""
    name: str
    """The repository's name."""

    def __init__(self, github: "GitHub", name: str):
        """
        Initializes a GitHub repository.

        Args:
            github (GitHub): the GitHub API client used to make requests to the GitHub API
            name (str): the repository's name
        """
        self.github = github
        self.name = name

    def get_content(
        self,
        path: str,
        ref: str | None = None,
        decode: bool = True,
    ) -> str | bytes | dict[str, Any]:
        """
        Gets the contents of a file in the repository.

        Args:
            path (str): the path to the file
            ref (str | None, optional): the branch, commit, or tag name. Defaults to None.

        Returns:
            str | bytes | dict[str, Any]: the contents of the file
        """
        response = self.github.session.get(
            urljoin(f"https://api.github.com/repos/{self.github.login}/{self.name}/contents/", path),
            params={
                **({"ref": ref} if ref is not None else {}),
            },
        )

        response.raise_for_status()

        data = response.json()

        if not decode:
            return data

        content = data["content"]
        encoding = data["encoding"]

        if encoding == "base64":
            content = base64.b64decode(content).decode()

        return content

    def update_content(
        self,
        path: str,
        content: str | bytes,
        message: str,
        committer_name: str,
        committer_email: str,
        branch: str | None = None,
    ) -> str:
        """
        Updates the contents of a file in the repository.

        Args:
            path (str): the path to the file
            content (str | bytes): the new content of the file
            message (str): the commit message
            committer_name (str): the name of the committer
            committer_email (str): the email of the committer
            branch (str | None, optional): the branch name. Defaults to None.

        Returns:
            str: the commit hash
        """

        response = self.github.session.put(
            urljoin(f"https://api.github.com/repos/{self.github.login}/{self.name}/contents/", path),
            json={
                "message": message,
                "committer": {
                    "name": committer_name,
                    "email": committer_email,
                },
                "content": base64.b64encode(content.encode()).decode(),
                "sha": self.get_content(path, ref=branch, decode=False)["sha"],
                **({"branch": branch} if branch is not None else {}),
            },
        )

        response.raise_for_status()

        return response.json()["commit"]["sha"]


class GitHub:
    login: str
    """The user's GitHub login."""
    session: requests.Session
    """The requests session used to make requests to the GitHub API."""

    def __init__(
        self,
        login: str,
        token: str | None = None,
        session: requests.Session | None = None,
    ):
        """
        Initializes a GitHub API client.

        Args:
            login (str): the user's GitHub login
            token (str | None, optional): the user's GitHub token. Defaults to None.
            session (requests.Session | None, optional): a requests session. Defaults to None.
        """
        self.login = login

        if session is None:
            session = requests.Session()

            if token is None:
                raise ValueError("token is required when session is None")

            session.headers.update({"Authorization": f"bearer {token}"})

        self.session = session

    def total_commits(self) -> int:
        """
        Returns the total number of commits authored by the user.
        """
        response = self.session.get(
            "https://api.github.com/search/commits",
            params={
                "q": f"author:{self.login}",
            },
        )

        response.raise_for_status()

        return response.json()["total_count"]

    def graphql(
        self,
        query: str,
        variables: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """
        Sends a GraphQL query to the GitHub API.

        Args:
            query (str): the GraphQL query
            variables (dict[str, str] | None, optional): the GraphQL variables. Defaults to None.

        Returns:
            dict[str, str]: the GraphQL response
        """
        response = self.session.post(
            "https://api.github.com/graphql",
            json={
                "query": query,
                "variables": variables,
            },
        )

        response.raise_for_status()

        return response.json()

    def repository(self, name: str) -> GithubRepository:
        """
        Returns a GitHub repository.

        Args:
            name (str): the repository's name

        Returns:
            GithubRepository: the GitHub repository
        """
        return GithubRepository(
            github=self,
            name=name,
        )
