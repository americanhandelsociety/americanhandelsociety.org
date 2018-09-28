# americanhandelsociety.org
The [American Handel Society (AHS)](http://americanhandelsociety.org/), an established 501(c)3 non-profit, seeks to foster study of the life, works, and times of George Frideric Handel and to encourage and support the performance of his music.

This repo contains the code and content for the AHS website. It's open source! Use this code as the initial blueprint for building other such organizational pages. 

## Get Started

`americanhandelsociety.org` uses [Jekyll, a friendly, easy-to-use static site builder](https://jekyllrb.com/), which requires fundamental knowledge of CSS, HTML, and Liquid templates. Get started by forking the repo (via Github) and cloning your fork.

```bash
$ git clone [url to your fork]
$ cd americanhandelsociety.org
$ gem install jekyll
$ jekyll serve -w
```

Then, navigate to http://localhost:4000/, and view the site in your browser.

## Deployment (for now)

`americanhandelsociety.org` uses custom-built plugins, [not supported by Github Pages](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/). This makes deployment a little tricky. Until the organization can set up a designated server, `americanhandelsociety.org` implements [an easy hack](https://github.com/jekyll/jekyll/issues/325#issuecomment-1135567) for deploying to Github Pages.

```bash
# Build the site on the up-to-date master, then turn off jekyll build and move the _site repo elsewhere.
be jekyll serve -w
cp -R _site ../

# Go to the deploy branch, and move _site from elsewhere to here. 
git co gh-pages
cp -R ../_site .

# Unpack the rendered site, commit, and push.
cp -R _site/* .
git add .
git commit -m "Prepare for deploy"
git push origin gh-pages
```
