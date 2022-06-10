import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <Head>
        <title>Alphawear.com</title>
        <meta name="description" content="Alphawear.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href={'/tshirts'}><a><img src="/slide1.webp" alt="" /></a></Link>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Shop with AlphaWear</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Buy Whatever You Want? What do you want? Its right in front of you.</p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
      <div className="flex flex-wrap m-auto">
        <div className="mx-auto mb-5">
        <Link href={'/trackpants'}><a><img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/3f41465b-7109-4bb2-bf79-ab89ff2128be1644407437899-HRX_and_Harvard_Trackpants.jpg" /></a></Link>
        </div>
        <div className="mx-auto mb-5">
        <Link href={'/tshirts'}><a><img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/f9621136-0f00-44d5-aa06-b727a6c8f7c51644407437944-M-H_and_Wrogn_Shirts.jpg" /></a></Link>
        </div>
        <div className="mx-auto mb-5">
        <Link href={'/tshirts'}><a><img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/eff5a33f-ea24-4e70-84e5-ec4d25ee5c7b1644407437968-Roadster_and_KnK_Tshirts.jpg" /></a></Link>
        </div>
        <div className="mx-auto mb-5">
        <Link href={'/tshirts'}><a><img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2022/3/10/b25f89eb-fbeb-4013-829e-32ee5b5daaa01646895183668-Roadster-HRX_Unisex.jpg" /></a></Link>
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/e27ee3af-3f6b-4106-9b20-2b4463c80ba41644407437953-Roadster-_Wrogn_Jeans.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/201d1bfd-287e-47b6-bef6-3c46eac444a51644407437906-Jeans_-_Roadster-_M-H_and_more.jpg" />
        </div>
        <div className="mx-auto mb-5">
        <Link href={'/shoes'}><a><img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/85d5e2e1-fa21-43b0-a352-438e15f1006e1598892141455-Nike.jpg" /></a></Link>
        </div>
        <div className="mx-auto mb-5">
        <Link href={'/hoodies'}><a><img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/22b908fa-38aa-46a6-a3cd-a5ccd46b04ce1598892141560-Puma.jpg" /></a></Link>
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/4abbda25-8d58-44f7-a986-c80fa31b08b31598892141513-Only.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/1/08f15f56-156e-45c8-b0bc-7aecd0b122431598970514602-Veromoda.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/1/da4935ce-8f3f-4273-bfbe-6ded783cf2131598948352513-Levis.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/10/e8546602-b217-45b0-a2d4-9469ba59938f1644475927176-Chemistry.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/8/5809282f-372d-4881-a8dc-95d5958a86be1644338988944-Roadster_HP.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/8/e96d85b8-7a62-4f57-898a-6c291ffb4d7f1644339048429-HRX_HP.jpg" />
        </div>
        <div className="mx-auto mb-5">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/10/fdbf3336-1777-46fd-aff6-7786268bc0d71644475927169-Harvard.jpg" />
        </div>
      </div>
    </div>
        </div>
      </section>
    </div>
  )
}
