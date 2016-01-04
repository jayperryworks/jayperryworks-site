###
# Compass
###

# Change Compass configuration
compass_config do |config|
    require "compass/import-once/activate"
#   config.output_style = :compact
end

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
    blog.name = "work"
    blog.prefix = "work"
    blog.sources = "{year}/{title}.html"
    blog.permalink = "{category}/{year}/{title}.html"
    blog.layout = "print"
end

activate :blog do |blog|
    blog.name = "writing"
    blog.prefix = "writing"
    blog.sources = "{year}/{month}-{day}-{title}.html"
    blog.permalink = "{year}/{month}/{title}.html"
    blog.taglink = "tags/{tag}.html"
    blog.summary_separator = /EXCERPT/
    blog.layout = "blog"
end

activate :directory_indexes
page "404.html", :directory_index => false

# Use relative URLs
activate :relative_assets

# Enable cache buster
# activate :asset_hash

# autoprefix CSS
activate :autoprefixer do |config|
    config.browsers = ['last 2 versions', 'Explorer >= 8']
end

activate :google_analytics do |ga|
    ga.tracking_id = 'UA-XXXXXXX-X' # Replace with your property ID.
end

# activate :s3_sync do |s3_sync|
#   # s3_sync.bucket                     = 'BUCKET' # The name of the S3 bucket you are targetting. This is globally unique.
#   s3_sync.region                     = 'us-east-1'     # The AWS region for your bucket.
#   # s3_sync.aws_access_key_id          = 'AWS KEY ID'
#   # # s3_sync.aws_secret_access_key      = 'AWS SECRET KEY'
#   # s3_sync.delete                     = false # We delete stray files by default.
#   # s3_sync.after_build                = false # We do not chain after the build step by default.
#   # s3_sync.prefer_gzip                = true
#   # s3_sync.path_style                 = true
#   # s3_sync.reduced_redundancy_storage = false
#   # s3_sync.acl                        = 'public-read'
#   # s3_sync.encryption                 = false
#   # s3_sync.prefix                     = ''
#   # s3_sync.version_bucket             = false
#   # s3_sync.error_document             = '404.html'
#   # s3_sync.index_suffix               = 'index.html'
# end

# run ES6 transpiler on the Javascript
# activate :es6

# Reload the browser automatically whenever files change
configure :development do
    activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
    def icon(id, title, role="img", opts={})
        output = "<svg class='icon #{id}' title='#{title}' role='#{role}'><use xlink:href='##{id}'></use></svg>"
    end

    # check to see if a highlight color is one of the defaults listed in colors.yml
    def highlight(color)
        if data.colors.include? color
            return data.colors[color.to_s]
        else
            return color
        end
    end
end

set :url_root, 'http://jayperryworks.com'
activate :search_engine_sitemap

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'
set :spritemap, 'assets/images/spritemap.svg'

set :relative_links, true

# Add bower's directory to sprockets asset path
# -> use bundler for back-end dependencies, bower for front-end dependencies
# -> http://dejimata.com/2013/11/4/bundler-meet-bower
after_configuration do
    @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
    sprockets.append_path File.join "#{root}", @bower_config["directory"]
    sprockets.import_asset "jquery/dist/jquery.min.js"
    sprockets.import_asset "modernizr/modernizr.js"
    sprockets.import_asset "picturefill/dist/picturefill.min.js"
    sprockets.import_asset "jquery.scrollTo/jquery.scrollTo.min.js"
end

# Build-specific configuration
configure :build do

    # Enable cache buster
    # activate :asset_hash

    activate :minify_html

    # For example, change the Compass output style for deployment
    activate :minify_css

    # Minify Javascript on build
    activate :minify_javascript

    # Compress/optimize images
    # -> svg optimization is handled by svgo
    activate :imageoptim do |options|
        options.image_extensions = %w(.png .jpg .gif)
    end

    # Or use a different image path
    # set :http_prefix, "/Content/images/"
end
