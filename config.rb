###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
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
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# run the blog extension
activate :blog do |blog|
  blog.prefix = "work"
  blog.permalink = "{category}/{year}/{title}/"
  blog.layout = "print"
end

# autoprefix CSS
activate :autoprefixer do |config|
    config.browsers = ['last 2 versions', 'Explorer >= 9']
end

activate :google_analytics do |ga|
  ga.tracking_id = 'UA-XXXXXXX-X' # Replace with your property ID.
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  # def svg_sprite(id, title="", role="img", opts={})
  #   "<svg class=\"icon " + id + "\" title=\"" + title + "\" role=\"" + role + "\">"
  #   "<use xlink:href=\"<%= asset_url(\"#{icon_sprites}##{id}\") %>\"></use>"
  #   "</svg>"
  # end
end

set :site_title, 'Jay Perry: Prints &amp; Paintings'

set :url_root, 'http://prints.jayperryworks.com'
activate :search_engine_sitemap

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :media_dir, 'media'
set :fonts_dir, 'assets/fonts'
set :icon_sprites, 'assets/images/spritemap.svg'

# Add bower's directory to sprockets asset path
# -> use bundler for back-end dependencies, bower for front-end dependencies
# -> http://dejimata.com/2013/11/4/bundler-meet-bower
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

# Build-specific configuration
configure :build do

  # Compress/optimize images
  # -> svg optimization is handled by gulp (svgstore)
  activate :imageoptim do |options|
    options.image_extensions = %w(.png .jpg .gif)
  end

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
