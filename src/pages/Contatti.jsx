import PageIntro from '../components/common/PageIntro.jsx'
import InquiryForm from '../components/booking/InquiryForm.jsx'

export default function Contatti() {
  return (
    <PageIntro id="contatti">
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <InquiryForm />
      </section>
    </PageIntro>
  )
}
