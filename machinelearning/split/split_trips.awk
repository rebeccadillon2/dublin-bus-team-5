# from https://stackoverflow.com/questions/42174594/awk-preserve-header-in-output

NR == 1 { header = $0; next}
        { fname = "lineid-" $3 ".csv"
        if( !( $3 in mem ) ) {
            print header > fname
            mem[ $3 ] = 1
        }
        print > fname 
        }
