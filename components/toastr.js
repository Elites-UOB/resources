import toastr from "toastr"
import "toastr/build/toastr.min.css"

export function useToastr() {
    toastr.options.closeButton = true
    toastr.options.closeMethod = "fadeOut"
    toastr.options.closeDuration = 300
    toastr.options.closeEasing = "swing"
    toastr.options.preventDuplicates = true
    toastr.options.progressBar = true
    toastr.options.positionClass = "toast-top-center"
    toastr.options.timeOut = 5000
    toastr.options.showMethod = "fadeIn"

    return toastr
}
