import PageIntro from '../components/common/PageIntro.jsx'
import InquiryForm from '../components/booking/InquiryForm.jsx'
import DirectContact from '../components/booking/DirectContact.jsx'

export default function Contatti() {
  return (
    <PageIntro id="contatti">
      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24">
        <DirectContact />
        <InquiryForm />
      </section>
    </PageIntro>
  )
}
