# Modules

MBS (Module Beheer Systeem), is a frontend application built on React. It offers developers a practical toolkit for software versioning.
With this tool, CRUD operations on modules are simplified, providing a clean and efficient workflow. The application 
facilitates the assignment of multiple versions to modules, accompanied by detailed descriptions and logos, 
contributing to a more organized and visually enhanced project structure.

A notable feature is the ability to generate mobile app versions and link specific modules to these versions. 
MBS's functionality is allowing developers to disable malfunctioning modules, providing a strategic fail-safe mechanism
for maintaining application stability during backend issues.

MBS serves as a practical companion for the Amsterdam-App where it's an indispensable tool for configuring, versioning, 
and en/disabling Amsterdam-App functionality with ease.

MBS its backend is build on Django/Python with a PostgresSQL database for storing all configurations.

## Build aapp-mbs

```
    make build
```
## Test aapp-mbs

```
    make test
```

## Deploy aapp-mbs

```
    make deploy