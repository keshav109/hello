import { SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div className="flex items-center justify-center items-center h-screen w-screen bg-[url('/wallpaper-967837.jpg')] bg-cover bg-center">
      <SignIn/>
    </div>
  )
}

export default SignInPage