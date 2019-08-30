###
# Page options, layouts, aliases and proxies
###

# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# General configuration
###

config[:images_dir] = 'assets/images'
config[:fonts_dir] = 'assets/fonts'
config[:css_dir] = 'assets/stylesheets'

config[:sass_assets_paths] = ['node_modules']

# ignore js, b/c we're handling with external pipeline
ignore 'assets/javascripts/*'

# disabled for now because there's not really any JS
activate :external_pipeline,
  name: :npm,
  command: build? ? 'npm run build' : 'npm start',
  source: ".tmp"

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# run the blog extension
activate :blog do |blog|
    blog.name = "pictures"
    blog.prefix = "pictures"
    blog.sources = "{year}-{title}.html"
    blog.permalink = "{year}/{title}.html"
    blog.layout = "picture"
end

# Redirect for old 'pictures' blog urls


config[:blog_summary_separator] = /EXCERPT/

activate :blog do |blog|
    blog.name = "writing"
    blog.prefix = "writing"
    blog.sources = "{year}-{month}-{day}-{title}.html"
    blog.permalink = "{year}/{month}/{title}.html"
    blog.taglink = "tags/{tag}.html"
    blog.summary_length = nil
    blog.summary_separator = config[:blog_summary_separator]
    blog.layout = "blog_post"
    blog.paginate = true
    blog.per_page = 10
end

activate :directory_indexes
page "404.html", :directory_index => false
page "admin/config.yml", :directory_index => false
page "admin/index.html", :directory_index => false

# explicitly set the markdown engine to Kramdown
config[:markdown_engine] = :kramdown

# Use relative URLs
# activate :relative_assets

# Enable cache buster
# activate :asset_hash

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end


###
# Helpers
###

# Methods defined in the helpers block are available in templates
# rubocop:disable Metrics/BlockLength
helpers do

  # render markdown from any string
  # https://stackoverflow.com/questions/43926754/how-to-output-data-from-yaml-variables-written-in-markdown-into-an-html-haml-f#44014190
  def render_markdown(content)
    Kramdown::Document.new(content).to_html
  end

  # grab a yml file from an arbitrary location and read it
  # -> used for storing data outside of the 'data' folder
  # -> http://stackoverflow.com/questions/13310488/how-can-i-read-a-yaml-file
  # def getYML(file) {
  #   return YAML.load_file(file)
  # }

  # "Component" decorator for partial function
  # -> just used to point automatically to "components" dir so you don't have to type the full path
  def component(name, opts = {}, &block)
    partial("components/#{name}", opts, &block)
  end

  def class_list(classes)
    list = classes.is_a?(String) ? classes : classes.join(' ').rstrip
    return " class='#{list}'" unless list.empty?
  end

  def props_list(props)
    list = props.is_a?(String) ? props : props.join(' ').rstrip
    return "='#{list}'" unless list.empty?
  end

  # figure out the utility padding classes to use
  # arguments:
  # STRING/HASH values (required): size of padding
  # -> Pass in a string to apply the same padding to all sides, e.g. 'wide'
  # -> Pass in a hash to apply padding to each side, e.g. { top: 'narrow' }.
  #    Any sides you leave out will have no padding.
  # -> we need all this logic in this method, doesn't make sense to split it up
  def padding_classes(values = "medium", property = "padding")
    # return a single class if a string is passed in
    return "no-#{property}" if values == "none"
    return "#{property}" if values == "medium"
    return "#{property}-#{values}" if values.is_a?(String)

    # return multiple classes if a hash is passed in
    values.collect do |side, width|
      return "no-#{property}-#{side}" if width == "none"
      return "#{property}-#{side}" if width == "medium"
      "#{property}-#{side}-#{width}"
    end.join(" ").rstrip
  end

  # figure out the utility border classes to use
  # arguments:
  # ARRAY list (required): a list of the sides that should get borders
  def border_classes(sides, class_prefix = 'border')
    if sides.is_a?(String)
      return '' if sides == 'none'
      return class_prefix if sides == 'all'
      return "#{class_prefix}-#{sides}"
    end
    sides.collect do |side|
      "#{class_prefix}-#{side}"
    end.join(' ').rstrip
  end

  # build an array of the posts from a given blog
  # STRING
  def get_posts(name)
    posts = []
    blog(name).articles.each do |post|
      posts.push(post)
    end
    return posts
  end

  def find_post_index(post, blog_name = "writing")
    posts = get_posts(blog_name)
    if posts.include?(post)
      return posts.index(post)
    else
      return false
    end
  end

  def next_post(post, blog_name = "writing")
    # find next post in TOC
    if find_post_index(post, blog_name) < (get_posts.length - 1)
      return get_posts[find_post_index(post, blog_name) + 1]
    else
      return false
    end
  end

  def prev_post(post, blog_name = "writing")
    # find previous post in TOC
    if find_post_index(post, blog_name) > 0
      return get_posts[find_post_index(post, blog_name) - 1]
    else
      return false
    end
  end

  # is this url in the current directory?
  # -> return true if url is an exact match or a subdirectory (e.g. /prints/waterfall = /prints)
  def current_dir?(url)
    return true if current_page.url.include?(url)
  end
end

set :url_root, 'https://jayperryworks.com'
# activate :search_engine_sitemap

# Use relative links all the time - helps catch url bugs before deployment
set :relative_links, true

# Build-specific configuration
configure :build do

  # Enable cache buster
  activate :asset_hash

  # autoprefix CSS
  activate :autoprefixer do |config|
    config.browsers = ['last 2 versions', 'Explorer >= 10']
  end

  set :url_root, 'https://jayperryworks.com'
  activate :search_engine_sitemap

  activate :minify_html
  activate :minify_css

  # "Ignore" JS so webpack has full control.
  # ignore { |path| path =~ /\/(.*)\.js$/ && $1 != 'all' }

  # Minify Javascript on build
  # activate :minify_javascript

  # Compress/optimize images
  # -> svg optimization is handled by svgo
  # activate :imageoptim do |options|
  #     options.image_extensions = %w(.png .jpg .gif .svg)
  # end

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# Copy the server config files in /public after build
# Cheers to Makzan for posting this. https://www.makzan.net/2015/09/configure-files-to-copy-without-middleman-building-process/
after_build do |builder|
  FileUtils.cp_r 'public/.', 'build'
end
