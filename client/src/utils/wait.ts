export default function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}