# https://stackoverflow.com/questions/68166250/awk-command-to-split-an-8gb-file-into-multiple-files-basis-number-of-rows-with-n

NR==1 { header = $0 }
(NR % 5000000) == 1 {
close(out)
out = "lt-" (++count) ".txt"
print header > out
}
NR>1 { print > out }
