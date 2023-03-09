export default function disableScroll() {
    return document.body.style.overflow = "hidden";
    // return () => (document.body.style.overflow = "scroll");
}