class CSV_Helpers < Middleman::Extension
  def initialize(app, options_hash={}, &block)
    super
  end
  helpers do
    def csv_data(file)
      csv_data = File.read(File.join(data_dir, file))
      hash = CSV.new(csv_data, :headers => true)
      return hash.to_a.map { |row| row.to_hash }
    end
  end
end
::Middleman::Extensions.register(:csv_helpers, CSV_Helpers)
