# americanhandelsociety.org
Website for the American Handel Society

### Deployment (for now)

```
# Turn off jekyll build, and move to deploy branch
git co gh-pages

# Unpack rendered site and push
cp -R _site/* .
git push origin gh-pages
```
