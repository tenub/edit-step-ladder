class MaxEditStepLadder
	def initialize(input)
		max = 0
		if input.length
			wlist = input.split(' ')
			n = wlist.length
			steps = [1]
			(1...n).each do |i|
				steps.push(1)
				curWord = wlist[i]
				curWordLength = wlist[i].length
				(0..2).each do |flag|
					(0...curWordLength).each do |position|
						('a'..'z').each do |char|
							newWord = transform(curWord, char, position, flag)
							if curWord < newWord
								break
							end
							newWordIndex = bsearch(wlist, newWord, i)
							if newWordIndex != -1 && steps[i] < steps[newWordIndex] + 1
								steps[i] = steps[newWordIndex] + 1
							end
						end
					end
				end
				('a'..'z').each do |char|
					newWord = transform(curWord, char, curWordLength, 0)
					if curWord < newWord
						break
					end
					newWordIndex = bsearch(wlist, newWord, i)
					if newWordIndex != -1 && steps[i] < steps[newWordIndex] + 1
						steps[i] = steps[newWordIndex] + 1
					end
				end
				if steps[i] > max
					max = steps[i]
				end
			end
			puts max
		end
	end

	def insert(word, char, i)
		return word[0...i] + char + word[i..-1]
	end

	def delete(word, i)
		return word[0...i] + word[i+1..-1]
	end

	def change(word, char, i)
		return word[0...i] + char + word[i+1..-1]
	end

	def transform(word, char, i, flag)
		if flag == 0
			return insert(word, char, i)
		elsif flag == 1
			return delete(word, i)
		else
			return change(word, char, i)
		end
	end

	def bsearch(array, needle, stop)
		left = 0
		right = stop - 1
		while left <= right
			mid = ((left + right) / 2).floor
			val = array[mid]
			if needle > val
				left = mid + 1
			elsif needle < val
				right = mid - 1
			else
				return mid
			end
		end
		return -1
	end
end

print 'Enter a list of space delimited words from which to calculate the maximum edit step ladder length: '
input = gets.strip

MaxEditStepLadder.new(input)