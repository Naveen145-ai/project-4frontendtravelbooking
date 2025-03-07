#Tuples
#immutable - cannot be change

tup = (2,3,4)
print(tup)

# tup[1] = 5   - cannot be done - error

# complete rearrangement is possible in the tuples, but single element changes not allowed
tup = (3,5,6)
print(tup)


#using index accessing element
print(tup[1])

# Accessing the values index location
print(tup.index(6))

#count how many number of four is available in the tuples
tup = (3,4,5,4,4)
print(tup.count(4))

#printng the element using for loop
for i in tup:
    print(i)

# check the value in the tuple
if 3 in tup:
    print('yes')

if tup:
    print('tup is not empty')

# check the tuple is empty or not
if tup:
    print('tup is not empty')




