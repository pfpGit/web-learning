export {}

interface Post{
    title: string,
    content?: string,
    readonly summary: string
}

function printPost (post:Post){
    console.log(post.title);
    console.log(post.content);
}

printPost({
    title: 'title',
    content: 'content',
    summary: 'a script'
})

printPost({
    title: 'title',
    summary: 'other'
})

interface Cacher{
    [prop: string]: string
}

const cache: Cacher={
    b: 'abd'
}
cache.a = 'abc'