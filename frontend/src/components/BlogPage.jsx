import React from "react";
import { layout, card } from "../../styles/sharedStyles";

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Portugal's D7 Visa in 2025",
    excerpt: "Everything you need to know about the D7 Passive Income Visa, including requirements, process, and timeline.",
    date: "2025-10-15",
    readTime: "8 min read",
    category: "Visas",
    slug: "d7-visa-guide-2025"
  },
  {
    id: 2,
    title: "Getting Your Portuguese NIF: Step-by-Step Guide",
    excerpt: "Learn how to obtain your Portuguese tax number (NIF) remotely and what documents you'll need.",
    date: "2025-10-12",
    readTime: "5 min read", 
    category: "Documentation",
    slug: "portuguese-nif-guide"
  },
  {
    id: 3,
    title: "Best Cities in Portugal for Expats in 2025",
    excerpt: "Discover the top Portuguese cities for expats, from Lisbon and Porto to hidden gems like Braga and Aveiro.",
    date: "2025-10-10",
    readTime: "12 min read",
    category: "Living in Portugal",
    slug: "best-cities-expats-portugal"
  },
  {
    id: 4,
    title: "Opening a Bank Account in Portugal: What You Need to Know",
    excerpt: "Complete guide to Portuguese banking for expats, including required documents and best bank options.",
    date: "2025-10-08",
    readTime: "7 min read",
    category: "Banking",
    slug: "portugal-bank-account-guide"
  },
  {
    id: 5,
    title: "Digital Nomad Visa Portugal: Requirements and Process",
    excerpt: "How to apply for Portugal's Digital Nomad Visa, who qualifies, and what the application process looks like.",
    date: "2025-10-05",
    readTime: "10 min read",
    category: "Visas", 
    slug: "digital-nomad-visa-portugal"
  },
  {
    id: 6,
    title: "Cost of Living in Portugal: Complete Breakdown",
    excerpt: "Detailed analysis of living costs in Portugal including housing, food, transportation, and entertainment.",
    date: "2025-10-03",
    readTime: "9 min read",
    category: "Living in Portugal",
    slug: "portugal-cost-of-living-2025"
  }
];

export default function BlogPage() {
  return (
    <div style={layout}>
      {/* Blog Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '6rem 2rem 4rem 2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Portugal Relocation Blog
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Expert insights, guides, and tips for relocating to Portugal. 
            Everything you need for a successful move.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section style={{ 
        padding: '4rem 2rem',
        background: '#f8f9fb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{ padding: '2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ 
                      background: '#0070f3',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {post.category}
                    </span>
                    <span style={{ 
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#222',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h2>
                  
                  <p style={{ 
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    <span style={{ 
                      color: '#888',
                      fontSize: '14px'
                    }}>
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span style={{ 
                      color: '#0070f3',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{
        background: 'linear-gradient(135deg, #eaf4ff 0%, #dbeafe 100%)',
        padding: '4rem 2rem',
        margin: '0 2rem',
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#222'
          }}>
            Stay Updated
          </h3>
          <p style={{ 
            color: '#666',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Get the latest Portugal relocation tips, guides, and updates delivered to your inbox.
          </p>
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ 
                padding: '12px 20px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '16px',
                minWidth: '250px',
                fontFamily: 'inherit'
              }}
            />
            <button style={{ 
              background: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export const meta = {
  title: "Portugal Relocation Blog | Expert Guides & Tips | Atlantical",
  description: "Expert guides and tips for relocating to Portugal. Learn about visas, NIF, banking, cost of living, and more from our relocation specialists.",
  keywords: "Portugal relocation blog, move to Portugal tips, Portugal visa guides, expat Portugal, Portugal immigration news"
};