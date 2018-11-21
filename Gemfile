# https://www.netlify.com/docs/continuous-deployment/#set-node-ruby-or-python-version
source "https://rubygems.org"
ruby "2.4.3"

# Middleman Gems
gem "middleman", ">= 4.2.0"
gem 'middleman-livereload'
gem "middleman-minify-html"
gem "middleman-google-analytics"
gem "middleman-autoprefixer"
# gem "middleman-search_engine_sitemap"
# gem "middleman-imageoptim"
gem "middleman-blog"

gem "nokogiri", ">= 1.8.2"

# Use LibSass instead of RubySass
gem "sassc"
gem "kramdown"

# URL-ize strings
gem "string-urlize"

# For faster file watcher updates on Windows:
gem 'wdm', '~> 0.1.0', platforms: [:mswin, :mingw]

# Windows does not come with time zone data
gem 'tzinfo-data', platforms: [:mswin, :mingw, :jruby]
