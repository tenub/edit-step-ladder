import string

class MaxEditStepLadder:
	def __init__(self, input):
		max = 0
		if len(input):
			wlist = input.strip().split()
			n = len(wlist)
			steps = [1]
			for i in range(1, n):
				steps.append(1)
				curWord = wlist[i]
				curWordLength = len(wlist[i])
				for flag in range(3):
					for position in range(curWordLength):
						for char in string.ascii_lowercase:
							newWord = self.transform(curWord, char, position, flag)
							if curWord < newWord:
								break
							newWordIndex = bsearch(wlist, newWord, i)
							if newWordIndex != -1 and steps[i] < steps[newWordIndex] + 1:
								steps[i] = steps[newWordIndex] + 1
				for char in string.ascii_lowercase:
					newWord = self.transform(curWord, char, curWordLength, 0)
					if curWord < newWord:
						break
					newWordIndex = bsearch(wlist, newWord, i)
					if newWordIndex != -1 and steps[i] < steps[newWordIndex] + 1:
						steps[i] = steps[newWordIndex] + 1
				if steps[i] > max:
					max = steps[i]
			print max;

	def insert(self, word, char, i):
		return word[0:i] + char + word[i:]

	def delete(self, word, i):
		return word[0:i] + word[i+1:]

	def change(self, word, char, i):
		return word[0:i] + char + word[i+1:]

	def transform(self, word, char, i, flag):
		if flag == 0:
			return self.insert(word, char, i)
		elif flag == 1:
			return self.delete(word, i)
		else:
			return self.change(word, char, i)

def bsearch(array, needle, end):
	left = 0
	right = end - 1
	while left <= right:
		mid = (left + right) // 2
		val = array[mid]
		if needle > val:
			left = mid + 1
		elif needle < val:
			right = mid - 1
		else:
			return mid
	return -1

input = raw_input('Enter a list of space delimited words from which to calculate the maximum edit step ladder length: ')

MaxEditStepLadder(input)