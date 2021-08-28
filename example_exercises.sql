INSERT INTO exercises (title,
                       difficulty,
                       task,
                       number_of_vars,
                       number_of_constraints,
                       target_vars,
                       constraint_vars,
                       constraint_vals)

VALUES ('Transportfähre',
        'MEDIUM',
        'Eine Fähre für LKWs und Busse hat 12 Stellplätze und kann bis zu 100 Tonnen befördern.' ||
        ' Ein LKW benötigt einen Stellplatz, wiegt 15 Tonnen und bringt 1000€ Gewinn. Ein Bus' ||
        ' benötigt zwei Stellplätze, wiegt 10 Tonnen und bringt 1500€ Gewinn. Insgesamt warten' ||
        ' 8 LKWs und 8 Busse auf die Überfahrt. Wie viele LKWs und Busse sollten transportiert' ||
        ' werden um den maximalen Gewinn zu erwirtschaften?',
        2,
        2,
        '[{"mathjs":"Fraction","n":1000,"d":1},{"mathjs":"Fraction","n":1500,"d":1}]',
        '[[{"mathjs":"Fraction","n":1,"d":1},{"mathjs":"Fraction","n":1,"d":2}],' ||
        ' [{"mathjs":"Fraction","n":15,"d":1},{"mathjs":"Fraction","n":10,"d":1}]]',
        '[{"mathjs":"Fraction","n":12,"d":1},{"mathjs":"Fraction","n":100,"d":1}]');
