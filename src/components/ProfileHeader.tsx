import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileHeader = () => {
  return (
    <div className="text-center mb-12">
      <Avatar className="w-24 h-24 mx-auto mb-6 shadow-lg">
        <AvatarImage src={profilePhoto} alt="Sanskar Yadav" />
        <AvatarFallback className="text-xl font-semibold bg-neutral-100 text-neutral-700">SY</AvatarFallback>
      </Avatar>
      <h1 className="text-3xl font-semibold text-neutral-900 mb-2">Sanskar Yadav</h1>
      <p className="text-lg text-neutral-600 max-w-md mx-auto leading-relaxed">
        Head of Growth @OneHash | Building the craziest tools on the Internet 🚀
      </p>
    </div>
  );
};