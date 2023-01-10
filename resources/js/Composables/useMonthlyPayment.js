import { computed, isRef } from 'vue'

export const useMonthlyPayment = (total, interestRate, duration) => {
  const totalChecked = computed(() => isRef(total) ? total.value : total)
  const interestRateChecked = computed(() => isRef(interestRate) ? interestRate.value : interestRate)
  const durationChecked = computed(() => isRef(duration) ? duration.value : duration)

  const monthlyPayment = computed(() => {
    const principle = totalChecked
    const monthlyInterest = interestRateChecked.value / 100 / 12
    const numberOfPaymentMonths = durationChecked.value * 12

    return principle.value * monthlyInterest * (Math.pow(1 + monthlyInterest, numberOfPaymentMonths)) / (Math.pow(1 + monthlyInterest, numberOfPaymentMonths) - 1)
  })

  const totalPaid = computed(() => {
    return durationChecked.value * 12 * monthlyPayment.value
  })

  const totalInterest = computed(() => {
    return totalPaid.value - totalChecked.value
  })

  return { monthlyPayment, totalPaid, totalInterest }
}