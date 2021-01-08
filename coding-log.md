# Errors
## Error because of router.ex
- in `router.ex` remove `TodoAppWeb` from `scope "/api", TodoAppWeb do`
## Ops error: 
- error is `phoenix_1  | standard_init_linux.go:219: exec user process caused: exec format error`
- make sure `#!/bin/bash` is on the first line of `entrypoint.sh`