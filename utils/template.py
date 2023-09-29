from os import PathLike
from pathlib import Path


class PlainTemplate:
    directory: Path
    encoding: str | None

    cached_templates: dict[Path, str] | None

    def __init__(
        self,
        directory: PathLike = Path("./templates"),
        use_cache: bool = True,
        encoding: str | None = None,
    ):
        directory = Path(directory).absolute()

        if not directory.exists():
            raise ValueError(f"directory {directory} does not exist")

        self.directory = directory
        self.cached_templates = {} if use_cache else None
        self.encoding = encoding

    def read(self, name: str) -> str:
        """
        Reads a template from the directory.
        """
        path = (self.directory / name).absolute()

        if self.cached_templates is not None and (text := self.cached_templates.get(path)) is not None:
            return text

        if not path.exists():
            raise ValueError(f"template {name} does not exist")

        text = path.read_text(encoding=self.encoding)

        if self.cached_templates is not None:
            self.cached_templates[path] = text

        return text

    def render(self, name: str, **kwargs) -> str:
        """
        Renders a template from the directory.
        """
        return self.read(name).format(**kwargs)
