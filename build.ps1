docker run --rm --volume="${pwd}:/srv/jekyll" -p "4000:4000" -it jekyll/jekyll jekyll serve --watch --force_polling
