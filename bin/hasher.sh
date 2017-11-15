#!/usr/bin/env bash
##
## hasher adds the hash of the content to the filename of each asset file, i.e.
## when a file change also its filename change witch makes the file chachable.
##
updateFile() {
    local file=$1
    local public=$2
    local assets=${public}/assets

    for asset in $(find ${assets});
    do
        if [ -f "$asset" ];then
            local hash=$(openssl sha1 ${asset} | awk '{print $2}')
            local path=${asset#*${public}/}
            local base=$(basename ${path})
            local dir=$(dirname ${path})

            local old=${path}
            local new="$dir/$hash-$base"

            sed -i orig "s|$old|$new|g" ${file}
            rm ${file}orig
        fi
    done
}

updateHTMLFiles() {
    local public=$1

    for file in $(find ${public}/*.html);
    do
        if [ -f "$file" ]; then
            updateFile ${file} ${public}
        fi
    done
}

renameAssets() {
    local assets=$1

    for file in $(find ${assets});
    do
        if [ -f "$file" ];then
            local hash=$(openssl sha1 ${file} | awk '{print $2}')
            local base=$(basename ${file})
            local dir=$(dirname ${file})
            mv ${file} "$dir/$hash-$base"
        fi
    done
}

main() {
    local project=$1
    local public=${project}/public
    local assets=${public}/assets

    updateFile ${assets}/js/bundle.js ${public}
    updateFile ${assets}/css/main.css ${public}
    updateHTMLFiles ${public}
    renameAssets ${assets}
}

main $@
