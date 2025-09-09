import { Card, CardContent } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"


const MetricCard = ({ title, value, subtitle, icon, trend, color = "blue" }: { title: string, value: number, subtitle: string, icon: React.ReactNode, trend: number, color: string }) => (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`inline-flex p-2 rounded-xl bg-${color}-50 mb-3`}>
              {icon}
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {formatNumber(value)}
              </p>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          {trend && (
            <div className="text-right">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

export default MetricCard