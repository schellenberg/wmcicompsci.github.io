#!/usr/bin/python

#balderdash functionality
from random import randint

#initialize list
lines = []

#get words
file = "words.txt"
#file = "$1/Contents/Resources/words.txt"
f = open(file,"r")			# open file for reading
lines = f.readlines()
f.close()

def get_word(num):
	lineNum = randint(0, len(lines) )
	if (lineNum % 2 == 1):	#if an odd number is chosen
		lineNum = lineNum - 1
	print str(num+1) + ": " + lines[lineNum] + " - " + lines[lineNum+1]


def roll():
	
	for i in range(5):
		print
	
	for i in range(5):
		get_word(i)
	
	for i in range(3):
		print
	
	roll = randint(1, 6)
	print "You rolled a " + str(roll)
	print
	print


while True:
	roll()
	raw_input("Press enter to draw another card...")