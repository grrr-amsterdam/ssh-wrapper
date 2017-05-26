# SSH Wrapper
[![Greenkeeper badge](https://badges.greenkeeper.io/grrr-amsterdam/ssh-wrapper.svg)](https://greenkeeper.io/)


# Methods
## `.exec(obj config, string command)`
Executes a command over SSH.
Expects a config object:
```node
{
    user: 'user',
    host: 'host',
    [key: 'private/key/file/path']
}
```

Returns a Promise containing the stdout output, or stderr in case of an error.
