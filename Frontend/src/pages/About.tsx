
import { Layout } from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Our Store</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              Welcome to our premium online shopping destination, where quality meets convenience. 
              Established in 2023, we've quickly become a trusted name in e-commerce by focusing on 
              customer satisfaction and offering a carefully curated selection of products.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to provide exceptional products at competitive prices while delivering 
              an enjoyable shopping experience. We believe in building long-term relationships with 
              our customers through honesty, reliability, and responsive service.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Team</h2>
            <p className="mb-6">
              We're a diverse team of retail experts, tech enthusiasts, and customer service 
              professionals united by our passion for e-commerce excellence. Our combined experience 
              spans multiple industries, allowing us to bring fresh perspectives and innovative ideas 
              to online shopping.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Quality Assurance</h2>
            <p className="mb-6">
              Every product in our catalog undergoes rigorous quality checks before being listed. 
              We work directly with manufacturers and trusted suppliers to ensure that our customers 
              receive only the best products that meet our high standards.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
