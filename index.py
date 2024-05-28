n1 = int(input("enter no.1 & operator (+,-,/,*) & no.2 => "))
op = input("")
n2 = int(input(""))

match op:
    case '+':
        print(n1+n2)
    case '-':
        print(n1-n2)
    case '*':
        print(n1*n2)
    case '/':
        print(n1/n2)
    case _:
        print("invalid")