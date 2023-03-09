export default function disableScroll() {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "scroll");
}