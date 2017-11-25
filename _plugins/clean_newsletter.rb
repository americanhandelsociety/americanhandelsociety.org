module Jekyll
  module NewsLetterSorter
    def sort_newsletters(input)
      # Select only newsletters from assets array
      select_assets = Array.new
      for file in input
        if file.path.include? 'assets/newsletter'
          select_assets << file
        end
      end

      # Put newsletters in order by year
      select_assets.sort_by! { |file| file.path.scan(/\d{4}/) }

      # Create a hash of newsletters with year as key
      ht = Hash.new {|h,k| h[k]=[]}
      regex = /\d{4}/
      for s in select_assets.reverse
        ht[s.path[regex]] << s
      end

      return ht
    end
  end
end

# Liquid::Template.register_filter(Jekyll::NewsLetterSorter)

# module Jekyll
#   module NewsLetterCleaner
#     def clean_newsletter(input)
#       if input
#         basename = input.gsub("/assets/newsletter/", "").gsub(".pdf", "")
#         regex = /\w{6}\_\d{4}/
#         title = basename[regex].sub("_", " ").capitalize

#         return title
#       end
#     end
#   end
# end

# Liquid::Template.register_filter(Jekyll::NewsLetterCleaner)

# module Jekyll
#   module Alphabetize
#     def alphabetize(input)
#       input.sort_by! { |el| el.path.downcase }
#       input.reverse
#     end
#   end
# end

# Liquid::Template.register_filter(Jekyll::Alphabetize)