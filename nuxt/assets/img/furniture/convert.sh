#!/bin/zsh

for image in *.webp;
do
    # mv $image "${image%.*}r.webp"
    # cwebp $image -o "${image%.*}.webp" >/dev/null 2>&1
    convert -gravity center -extent 100x100 -background white "${image%.*}.webp" "$image"
    # rm $image
done

