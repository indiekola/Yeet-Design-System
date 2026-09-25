// Сгенерировано scripts/build-tokens.mjs из tokens/tokens.json — не редактировать вручную.
// SwiftUI. Цвета меняются со светлой / тёмной темой системы автоматически.

import SwiftUI
import UIKit

private extension UIColor {
    convenience init(hex: UInt32, alpha: CGFloat = 1) {
        self.init(red: CGFloat((hex >> 16) & 0xFF) / 255, green: CGFloat((hex >> 8) & 0xFF) / 255, blue: CGFloat(hex & 0xFF) / 255, alpha: alpha)
    }
}

private func dynamic(_ light: UIColor, _ dark: UIColor) -> Color {
    Color(UIColor { $0.userInterfaceStyle == .dark ? dark : light })
}

public enum YeetColor {
    // Поверхности
    /// Фон экрана · Figma ui-colors/white
    public static let bgCanvas = dynamic(UIColor(hex: 0xFFFFFF, alpha: 1), UIColor(hex: 0x0F0F11, alpha: 1))
    /// Поднятые поверхности: tab-bar, sheet, dialog, hint · Figma ui-colors/elevated
    public static let bgElevated = dynamic(UIColor(hex: 0xFFFFFF, alpha: 1), UIColor(hex: 0x1A1A1E, alpha: 1))
    /// Карточки, поля, tertiary-кнопки · Figma ui-colors/light-grey
    public static let bgSubtle = dynamic(UIColor(hex: 0xF7F7F7, alpha: 1), UIColor(hex: 0x26262B, alpha: 1))
    /// Snackbar, Secondary-кнопка, погода · Figma ui-colors/black
    public static let bgInverse = dynamic(UIColor(hex: 0x000000, alpha: 1), UIColor(hex: 0xF5F5F7, alpha: 1))
    /// Затемнение под модальным sheet · Figma ui-colors/overlay
    public static let bgOverlay = dynamic(UIColor(hex: 0x000000, alpha: 0.4), UIColor(hex: 0x000000, alpha: 0.6))
    // Контент
    /// Основной текст и иконки · Figma ui-colors/black
    public static let textPrimary = dynamic(UIColor(hex: 0x000000, alpha: 1), UIColor(hex: 0xF5F5F7, alpha: 1))
    /// Вторичный текст, лейблы, подписи · Figma ui-colors/grey
    public static let textSecondary = dynamic(UIColor(hex: 0x777777, alpha: 1), UIColor(hex: 0x8E8E93, alpha: 1))
    /// Текст на inverse-поверхности · Figma ui-colors/white
    public static let textInverse = dynamic(UIColor(hex: 0xFFFFFF, alpha: 1), UIColor(hex: 0x0F0F11, alpha: 1))
    /// Текст и иконки на accent / danger · Figma ui-colors/on-accent
    public static let textOnAccent = dynamic(UIColor(hex: 0xFFFFFF, alpha: 1), UIColor(hex: 0xFFFFFF, alpha: 1))
    /// Акцентный текст, выбранное · Figma ui-colors/blue
    public static let textAccent = dynamic(UIColor(hex: 0x0100F4, alpha: 1), UIColor(hex: 0x5B5BFF, alpha: 1))
    /// Ошибки, деструктивные действия · Figma ui-colors/red
    public static let textDanger = dynamic(UIColor(hex: 0xFF4230, alpha: 1), UIColor(hex: 0xFF5A4A, alpha: 1))
    // Акцент, обратная связь, линии
    /// Главное действие, выбранное, фокус · Figma ui-colors/blue
    public static let accent = dynamic(UIColor(hex: 0x0100F4, alpha: 1), UIColor(hex: 0x5B5BFF, alpha: 1))
    /// Фон выбранного чипса (Soft) · Figma ui-colors/blue-10%
    public static let accentSoft = dynamic(UIColor(hex: 0x0100F4, alpha: 0.1), UIColor(hex: 0x5B5BFF, alpha: 0.2))
    /// Удаление, ошибка, бейдж скидки · Figma ui-colors/red
    public static let danger = dynamic(UIColor(hex: 0xFF4230, alpha: 1), UIColor(hex: 0xFF5A4A, alpha: 1))
    /// Фон Destructive-кнопки · Figma ui-colors/red-10%
    public static let dangerSoft = dynamic(UIColor(hex: 0xFF4230, alpha: 0.1), UIColor(hex: 0xFF5A4A, alpha: 0.18))
    /// Обводки свотчей, гистограмма, фон неактивных точек · Figma ui-colors/black-10%
    public static let borderSubtle = dynamic(UIColor(hex: 0x000000, alpha: 0.1), UIColor(hex: 0xF5F5F7, alpha: 0.12))
    /// Разделители строк в input-group и list-group · Figma divider (black @5%)
    public static let divider = dynamic(UIColor(hex: 0x000000, alpha: 0.05), UIColor(hex: 0xF5F5F7, alpha: 0.08))
}

/// Цвет вещи — атрибут одежды, не интерфейс.
public enum YeetItemColor: String, CaseIterable {
    case black
    case grey
    case white
    case purple
    case pink
    case green
    case blue
    case yellow
    case orange
    case red
    case beige
    case brown
    public var color: Color {
        switch self {
        case .black: return Color(UIColor(hex: 0x1A1A2E, alpha: 1))
        case .grey: return Color(UIColor(hex: 0x777777, alpha: 1))
        case .white: return Color(UIColor(hex: 0xFFFFFF, alpha: 1))
        case .purple: return Color(UIColor(hex: 0x6A00FF, alpha: 1))
        case .pink: return Color(UIColor(hex: 0xD900FF, alpha: 1))
        case .green: return Color(UIColor(hex: 0x00D08B, alpha: 1))
        case .blue: return Color(UIColor(hex: 0x0100F4, alpha: 1))
        case .yellow: return Color(UIColor(hex: 0xFFD000, alpha: 1))
        case .orange: return Color(UIColor(hex: 0xFF8800, alpha: 1))
        case .red: return Color(UIColor(hex: 0xFF4230, alpha: 1))
        case .beige: return Color(UIColor(hex: 0xFFE1C7, alpha: 1))
        case .brown: return Color(UIColor(hex: 0xC26547, alpha: 1))
        }
    }
    public var title: String {
        switch self {
        case .black: return "Чёрный"
        case .grey: return "Серый"
        case .white: return "Белый"
        case .purple: return "Фиолетовый"
        case .pink: return "Розовый"
        case .green: return "Зелёный"
        case .blue: return "Синий"
        case .yellow: return "Жёлтый"
        case .orange: return "Оранжевый"
        case .red: return "Красный"
        case .beige: return "Бежевый"
        case .brown: return "Коричневый"
        }
    }
}

public enum YeetSpace {
    public static let s0: CGFloat = 0
    public static let s1: CGFloat = 1
    public static let s2: CGFloat = 2
    public static let s4: CGFloat = 4
    public static let s8: CGFloat = 8
    public static let s12: CGFloat = 12
    public static let s16: CGFloat = 16
    public static let s20: CGFloat = 20
    public static let s24: CGFloat = 24
    public static let s28: CGFloat = 28
    public static let s32: CGFloat = 32
    public static let s40: CGFloat = 40
    public static let s48: CGFloat = 48
    public static let s52: CGFloat = 52
    public static let s56: CGFloat = 56
    public static let s64: CGFloat = 64
    public static let s72: CGFloat = 72
    public static let screenGutter: CGFloat = 20
}

public enum YeetRadius {
    /// Хэндл sheet
    public static let xs: CGFloat = 4
    /// Badge
    public static let sm: CGFloat = 12
    /// Snackbar, cap столбца графика
    public static let md: CGFloat = 16
    /// Карточки, поля, фото
    public static let lg: CGFloat = 20
    /// Кнопки-капсулы, верх sheet, подсказка стилиста
    public static let xl: CGFloat = 32
    /// Tab-bar
    public static let bar: CGFloat = 48
    /// Аватар, радио
    public static let full: CGFloat = 999
}

public struct YeetTextStyle {
    public let font: Font
    public let lineHeight: CGFloat
    public let tracking: CGFloat
    public let size: CGFloat
}

public enum YeetType {
    /// Заголовки экранов
    public static let h1 = YeetTextStyle(font: .custom("RobotoSlab-Regular", size: 32).weight(Font.Weight(380)), lineHeight: 36, tracking: -1, size: 32)
    /// Секции, пустые состояния, числа
    public static let h2 = YeetTextStyle(font: .custom("RobotoSlab-Regular", size: 24).weight(Font.Weight(400)), lineHeight: 28, tracking: -0.4, size: 24)
    /// Заголовки sheet, диалогов, карточек
    public static let h3 = YeetTextStyle(font: .custom("RobotoSlab-Regular", size: 19).weight(Font.Weight(400)), lineHeight: 24, tracking: -0.3, size: 19)
    /// Текст, кнопки, пункты списков
    public static let body = YeetTextStyle(font: .custom("Inter", size: 14).weight(Font.Weight(500)), lineHeight: 20, tracking: 0, size: 14)
    /// Подписи, мета-данные, бейджи
    public static let caption = YeetTextStyle(font: .custom("Inter", size: 12).weight(Font.Weight(400)), lineHeight: 16, tracking: 0, size: 12)
}

private extension Font.Weight {
    init(_ css: Int) {
        switch css {
        case ..<350: self = .light
        case ..<450: self = .regular
        case ..<550: self = .medium
        default: self = .semibold
        }
    }
}

public extension View {
    /// Применяет текстовый стиль: шрифт, межстрочный интервал и трекинг.
    func yeetText(_ style: YeetTextStyle) -> some View {
        font(style.font).lineSpacing(style.lineHeight - style.size).tracking(style.tracking)
    }
}

public enum YeetMotion {
    /// Нажатие кнопки, scale 0.97
    public static let press = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.15)
    /// Затухание краёв, тосты
    public static let fade = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.24)
    /// Фото сворачивается в шапку при скролле
    public static let collapse = Animation.timingCurve(0, 0, 0.58, 1, duration: 0.3)
    /// Листание образов и поводов по свайпу
    public static let page = Animation.timingCurve(0, 0, 0.58, 1, duration: 0.3)
    /// Таб-бар уступает место FAB · Figma Smart Animate Quick
    public static let nav = Animation.interpolatingSpring(mass: 1, stiffness: 300, damping: 20)
    /// Штамп «Надеть» → отмечено · Figma Smart Animate Bouncy
    public static let stamp = Animation.interpolatingSpring(mass: 1, stiffness: 600, damping: 15)
    /// Смена образа: превью ↔ коллаж · Figma Smart Animate Gentle
    public static let swap = Animation.interpolatingSpring(mass: 1, stiffness: 100, damping: 15)
}

public extension View {
    /// Tab-bar, FAB, hint, панель sheet
    func yeetFloatingShadow() -> some View {
        shadow(color: dynamic(UIColor(hex: 0x000000, alpha: 0.12), UIColor(hex: 0x000000, alpha: 0.5)), radius: 20, x: 0, y: 8)
    }
}
