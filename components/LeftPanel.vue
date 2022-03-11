<template>
  <div class="flex content-center items-center text-center mt-3 flex-col">
    <img :src="myPhoto" class="w-40 rounded-full border-2 border-gray-700 hover:border-red-700 transition duration-200">
    <h1 class="text-2xl font-semibold">
      {{ myName }}
    </h1>
    <div class="text-sm font-light hover:color-blue-200">
      {{ myJobTitle }}
    </div>
    <div class="my-4 w-full">
      <h1 class="text-lg mb-2 font-semibold border-b-2 border-black">
        About Me
      </h1>
      <p class="text-justify text-sm">
        {{ myDesc }}
      </p>
    </div>
    <div class="my-4 w-full">
      <h1 class="text-lg mb-2 font-semibold border-b-2 border-black">
        Contact
      </h1>
      <div v-if="myMobile !== null">
        <div class="font-semibold">
          Phone:
        </div>
        <div class="text-sm">
          {{ myMobile }}
        </div>
      </div>
      <div>
        <div class="font-semibold">
          Email:
        </div>
        <div class="text-sm">
          <a :href="`mailto:` + myEmail" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myEmail }}
          </a>
        </div>
      </div>
      <div v-if="myWebsite !== null">
        <div class="font-semibold">
          Website:
        </div>
        <div class="text-sm">
          <a :href="myWebsite" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myWebsite }}
          </a>
        </div>
      </div>
      <div v-if="myHome !== null">
        <div class="font-semibold">
          Home:
        </div>
        <div class="text-sm">
          {{ myHome }}
        </div>
      </div>
    </div>
    <div class="my-4 w-full">
      <h1 class="text-lg mb-2 font-semibold border-b-2 border-black">
        Social Media
      </h1>
      <div v-if="myGithub !== null">
        <div class="font-semibold">
          GitHub:
        </div>
        <div class="text-sm">
          <a :href="`http://` + myGithub" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myGithub }}
          </a>
        </div>
      </div>
      <div v-if="myFacebook !== null">
        <div class="font-semibold">
          Facebok:
        </div>
        <div class="text-sm">
          <a :href="`http://` + myFacebook" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myFacebook }}
          </a>
        </div>
      </div>
      <div v-if="myInstagram !== null">
        <div class="font-semibold">
          Instagram:
        </div>
        <div class="text-sm">
          <a :href="`http://` + myInstagram" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myInstagram }}
          </a>
        </div>
      </div>
      <div v-if="myTwitter !== null">
        <div class="font-semibold">
          Twitter:
        </div>
        <div class="text-sm">
          <a :href="`http://` + myTwitter" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myTwitter }}
          </a>
        </div>
      </div>
      <div v-if="myLinkedIn !== null">
        <div class="font-semibold">
          LinkedIn:
        </div>
        <div class="text-sm">
          <a :href="`http://` + myLinkedIn" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">
            {{ myLinkedIn }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyProfile from '~/static/my_profile'

export default {
  data () {
    return {
      myName: MyProfile.fullname.toUpperCase() ?? 'Your Name',
      myPhoto: MyProfile.photo ?? '/icon.png',
      myJobTitle: MyProfile.title ?? 'Professional',
      myDesc: MyProfile.description ?? 'I am a professional',
      myEmail: MyProfile.contact.email ?? 'iam@email.com',
      myMobile: MyProfile.contact.mobile ?? null,
      myWebsite: MyProfile.contact.website ?? null,
      myHome: MyProfile.contact.home ?? null,
      myFacebook: MyProfile.socialMedia.facebook ?? null,
      myInstagram: MyProfile.socialMedia.instagram ?? null,
      myGithub: MyProfile.socialMedia.github ?? null,
      myTwitter: MyProfile.socialMedia.twitter ?? null,
      myLinkedIn: MyProfile.socialMedia.linkedin ?? null
    }
  }
}
</script>
