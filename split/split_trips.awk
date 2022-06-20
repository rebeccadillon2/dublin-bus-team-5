# from https://stackoverflow.com/questions/42174594/awk-preserve-header-in-output

NR == 1 { header = $0; next}
        { fname = "lineid-" $4 ".txt"
        if( !( $4 in mem ) ) {
            print header > fname
            mem[ $4 ] = 1
        }
        print > fname 
        }
