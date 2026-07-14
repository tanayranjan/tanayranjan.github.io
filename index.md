---
layout: home
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: id_home

# image for page specific usage
img: ":home-heading.jpg"
# publish date (used for seo)
# if not specified, site.time will be used.
#date: 2022-03-03 12:32:00 +0000

# for override items in _data/lang/[language].yml
#title: My title
#button_name: "My button"
# for override side_and_top_nav_buttons in _data/conf/main.yml
#icon: "fa fa-bath"

# seo
# if not specified, date will be used.
#meta_modify_date: 2022-03-03 12:32:00 +0000
# check the meta_common_description in _data/owner/[language].yml
#meta_description: ""

# optional
# please use the "image_viewer_on" below to enable image viewer for individual pages or posts (_posts/ or [language]/_posts folders).
# image viewer can be enabled or disabled for all posts using the "image_viewer_posts: true" setting in _data/conf/main.yml.
#image_viewer_on: true
# please use the "image_lazy_loader_on" below to enable image lazy loader for individual pages or posts (_posts/ or [language]/_posts folders).
# image lazy loader can be enabled or disabled for all posts using the "image_lazy_loader_posts: true" setting in _data/conf/main.yml.
#image_lazy_loader_on: true
# exclude from on site search
#on_site_search_exclude: true
# exclude from search engines
#search_engine_exclude: true
# to disable this page, simply set published: false or delete this file
# don't forget that this is root index.html. If you disable this, there will be no index.html page to open
# published: false
---

{%- comment -%} Please delete below and place your page content here {%- endcomment -%}


Hi, I'm **Tanay Ranjan**.

I enjoy building intelligent robotic systems and exploring the intersection of control, perception, and autonomy. From research internships and engineering projects to my current master's studies at RWTH Aachen University, this website documents the journey that has shaped my interests and work.

Feel free to explore the [About]({{ site.baseurl }}{% link tabs/about.md %}), [Journey]({{ site.baseurl }}{% link tabs/journey.md %}), and [Project]({{ site.baseurl }}{% link tabs/blog/index.html %}) pages to learn more about me, the experiences that have shaped my path, and the work I've been fortunate to contribute to. Thanks for stopping by!
