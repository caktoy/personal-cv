<template>
  <div v-if="experiences.length > 0">
    <experience-section class="my-4 pb-2 w-full" :items="experiences" />
    <education-section class="my-4 pb-2 w-full" :items="educations" />
    <skill-section class="my-4 pb-2 w-full" :items="skills" />
    <portofolio-section class="my-4 pb-2 w-full" :items="portofolios" />
  </div>
</template>

<script>
import MyProfile from '~/static/my_profile'
import ExperienceSection from '~/components/ExperienceSection'
import EducationSection from '~/components/EducationSection'
import SkillSection from '~/components/SkillSection'
import PortofolioSection from '~/components/PortofolioSection'

export default {
  components: { ExperienceSection, EducationSection, SkillSection, PortofolioSection },
  data () {
    const { experiences, educations, skills, portofolios } = MyProfile
    return {
      experiences,
      educations,
      skills,
      portofolios
    }
  }
}
</script>
