# americanhandelsociety.org
Website for the American Handel Society

### Deployment (for now)

```
# Turn off jekyll build, and move to deploy branch
cp -R _site ../
git co gh-pages

# Move _site
mv ../_site .

# Unpack rendered site and push
cp -R _site/* .
git push origin gh-pages
```
