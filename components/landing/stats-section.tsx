export function StatsSection() {
  const stats = [
    {
      number: '10M+',
      label: 'Links Shortened',
      description: 'Trusted by millions worldwide'
    },
    {
      number: '500M+',
      label: 'Clicks Tracked',
      description: 'Comprehensive analytics data'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable service guarantee'
    },
    {
      number: '150+',
      label: 'Countries',
      description: 'Global reach and presence'
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
