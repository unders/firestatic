#!/usr/bin/env bash
##
## hasher adds the hash of the content to the filename
##

function update() {
    local public=$1
    local old=$2
    local new=$3

    for file in $(find ${public});
    do
        if [ -f "$file" ];then
            if [[ ${file} =~ (.*)\.(gif|png|jpg|xml|json|ico)$ ]]; then
                # we should not update these files
                continue
            fi
            sed -i oldx "s|$old|$new|g" ${file}
            rm ${file}oldx
        fi
    done
}

function updateFiles() {
    local public=$1

    for file in $(find ${public}/assets);
    do
        if [ -f "$file" ];then
            local hash=$(openssl sha1 ${file} | awk '{print $2}')
            local path=${file#*${public}/}
            local base=$(basename ${path})
            local dir=$(dirname ${path})
            update ${public} ${path} "$dir/$hash-$base"
        fi
    done
}

renameFiles() {
    local public=$1

    for file in $(find ${public}/assets);
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

    updateFiles ${project}/public
    renameFiles ${project}/public
}

main $@
