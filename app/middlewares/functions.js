module.exports = {
    escaperegex: (text) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    datesubtraction: (current, date) => {
        var diff   = Math.abs(current - date);
        if(Math.floor(diff / (1000 * 60)) == 0){
            return "just now";
        }else{
            if(Math.floor(diff / (1000 * 60)) > 0 
               && Math.floor(diff / (1000 * 60 * 60)) == 0){
                if(Math.floor(diff / (1000 * 60)) > 1){
                    return Math.floor(diff / (1000 * 60)) + " minutes ago";
                }else{
                    return "a minute ago";
                }
            }else if(Math.floor(diff / (1000 * 60 * 60)) > 0
                     && Math.floor(diff / (1000 * 60 * 60 * 24)) == 0){
                if(Math.floor(diff / (1000 * 60 * 60)) > 1){
                    return Math.floor(diff / (1000 * 60 * 60)) + " hours ago";
                }else{
                    return "an hour ago";
                }
            }else if(Math.floor(diff / (1000 * 60 * 60 * 24)) > 0
                     && Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) == 0){
                if(Math.floor(diff / (1000 * 60 * 60 * 24)) > 1){
                    return Math.floor(diff / (1000 * 60 * 60 * 24)) + " days ago";
                }else{
                    return "a day ago";
                }
            }else if(Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) > 0
                     && Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) == 0){
                if(Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) > 1){
                    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + " weeks ago";
                }else{
                    return "a week ago";
                }
            }else if(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) > 0
                     && Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)) == 0){
                if(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) > 1){
                    return Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) + " months ago";
                }else{
                    return "a month ago";
                }
            }else if(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)) > 0){
                if(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) > 1){
                    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
                     + " years ago";
                }else{
                    return "a year ago";
                }
            }
        }
    }
}