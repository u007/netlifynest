
# add resource 

select API, and Yes to crud entry points

```
 make admin-model-gen name=namehereinplural
# example: make admin-model-gen name=roles

```

# add admin module

this is already exists

```
npx nest g module crud
```

# add service to module

```
npx nest g service crud/xyz
```

# add controller to module

```
npx nest g controller crud/xyz
```
```