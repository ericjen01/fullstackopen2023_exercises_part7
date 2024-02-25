const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const max = Object.values(blogs)

    .reduce((prev,current) => {
        return (prev && prev.likes > current.likes) 
        ? prev 
        : current
    },0)

    return max
}

const mostBlogs = (blogs) => {
    const authorsRawData = blogs.map(b => b.author)
    const authorBlogCounts = {}

    authorsRawData.forEach(a => {
        authorBlogCounts[a] = (authorBlogCounts[a] || 0) + 1
        //counts[x] || 0 returns the value of counts[x] if it is set, otherwise 0. 
        //Then just add one and set it again in the object and the count is done.
    })

    const max = Object.entries(authorBlogCounts)
        .reduce((prev, current) => {
            return (prev && prev[1] > current[1]) 
            ? prev 
            : current
    }, 0) 

    return max
}

const mostLikes = (blogs) => {
    const authorLikesCounts = {}

    blogs.forEach(b => {
        authorLikesCounts[b.author] 
        = (authorLikesCounts[b.author] || 0) + b.likes
    })

    const max = Object.entries(authorLikesCounts)
        .reduce((prev, current) =>(
            (prev && prev[1] > current[1]) 
            ? prev 
            : current
    ),0)

    return max
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}