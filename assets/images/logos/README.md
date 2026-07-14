# Journey logos

Store optional Journey-entry logos in this directory. SVG is preferred; PNG and JPG are also supported.

Reference a logo from `_data/content/journey/en.yml` with a root-relative path, for example:

```yaml
logo: /assets/images/logos/rwth.svg
```

When `logo` is absent, the Journey card uses its optional Font Awesome 4 `icon` value instead. If both are absent, no identity block is rendered.
